#! /usr/bin/python3


'''
Continuous integration tasks
'''


import pexpect
import sys
import time
import json
import re


TMP_FILE = 'gl-bot.out'
CREDS = {'email': 'nghtmobileapp@gmail.com', 'mega_pass': 'zBRvm7vxZm',
         'appetize_token': 'tok_dt65c2akfaqp6n04jh1e863ef8', 'android_pk': 'zn6hvv5fvza5nnc5g9z4y7cn3w'}
SLACK_HOOK = ' https://hooks.slack.com/services/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'


def pesh(cmd, out=sys.stdout, shell='/bin/bash'):
    # takes command as a string or list
    result = ''
    child = pexpect.spawnu(shell, ['-c', cmd] if type(cmd) == type('') else cmd)

    if not out == sys.stdout:
        result = out
        out = open(TMP_FILE, 'w')
    child.logfile = out
    child.expect(pexpect.EOF)  # command complete and exited

    if out == sys.stdout:
        return 1
    out.close()
    lines = []

    with open(TMP_FILE) as fo:

        for line in fo:
            lines.append(line.strip())

    if type(result) == type(0):
        # get line specified by number
        return lines[result]

    if result == 'all':
        # all lines
        return lines

    if type(result) == type(''):
        # get line specified by pattern

        for line in lines:

            if result in line:  # TODO: make into regex match
                return line

def apt_install(apps):
    # check for and install missing apps
    apps = apps.split(' ')
    for app in apps:
        child = pexpect.spawnu('which %s' % app)
        result = child.expect([app, pexpect.EOF])  # NB: doesn't work for packages with diff names from target
        if result == 0: continue
        pesh('sudo apt install -y %s' % app)

def install_mega():
    # get and install Mega if it isn't there; TODO: refract to download and install ANY deb
    child = pexpect.spawnu('which mega-cmd')
    result = child.expect(['mega-cmd', pexpect.EOF])
    if result == 0: return  # found it, don't install
    pesh('wget https://mega.nz/linux/MEGAsync/xUbuntu_16.04/amd64/megacmd-xUbuntu_16.04_amd64.deb megacmd.deb')
    pesh('sudo dpkg -i megacmd.deb')
    pesh('sudo apt -f install')
    pesh('sudo dpkg -i megacmd.deb')
    print('Mega installed')
    return

def mega_deploy(binPath):
    # get the latest build and upload to Mega
    install_mega()
    print('Deploying %s to Mega account...' % binPath.split('/')[-1])
    expList = [pexpect.EOF, pexpect.TIMEOUT]
    child = pexpect.spawnu('mega-cmd', timeout=60)
    child.logfile_read = open(TMP_FILE, 'w')
    loggedIn = False
    deploying = False
    deployed = False
    destPath = ''
    res = {}
    while True:
        time.sleep(0.5)
        result = child.expect(expList + ['MEGA CMD>', 'nghtmobileapp@gmail.com:', '100.00 %', 'Exported', 'Logging out'])
        #print('DBG: result is %s' % result)
        if result == 3: loggedIn = True
        if result == 2: loggedIn = False
        if result < 2 and not deployed:
            raise Exception("Something went wrong or process took too long")
            break
        if not loggedIn and not deployed:
            print('Logging into Mega')
            child.sendline('login %s %s' % (CREDS['email'], CREDS['mega_pass']))
            continue
        if loggedIn and not deploying:
            deploying = True
            print('Deploying')
            destPath = '/bin/android/' if 'android' in binPath else '/bin/ios'
            destPath += 'debug/' if 'debug' in binPath else 'release/'
            destPath += curr_time() + '/' + binPath.split('/')[-1]
            child.sendline('put %s -c %s' % (binPath, destPath))
            continue
        if result == 4:
            # upload was successful
            depolying = False
            deployed = True
            print('Deployed!')
            child.sendline('export -a %s' % destPath)
            continue
        if result == 5:
            # export was successful
            urlLine = ''
            with open(TMP_FILE) as fo:
                for l in fo:
                    urlLine = l.strip()
                    if 'Exported ' in urlLine: break
            url = urlLine.split(' ')[-1]
            print('App can now be downloaded at %s' % url)
            res['dlURL'] = url
            child.sendline('logout')
            continue
        if result == 2 and deployed:
            child.sendline('quit')
            break
    return res

def appetize_deploy(binPath):
    #upload = 'curl https://%s@api.appetize.io/v1/apps -F "file=@%s" -F "platform=android"' % (CREDS['appetize_token'], binPath)  # creates a new app
    upload = 'curl https://%s@api.appetize.io/v1/apps/%s -F "file=@%s" -F "platform=android" -F "timeout=30" -F "buttonText=NGHT"' % (CREDS['appetize_token'], CREDS['android_pk'], binPath)
    result = json.loads(pesh(upload, out='appURL'))
    webSrc = 'https://appetize.io/embed/%s?device=nexus5&scale=100&autoplay=false&orientation=portrait&deviceColor=black' % result['publicKey']
    return {'testURL': result['appURL']}

def slack_post(text='', botName='', channel='', botIcon=''):
    text = 'Testing webhook' if text == '' else text
    botName = 'botler' if botName == '' else botName
    channel = '#nght-dev' if channel == '' else channel
    botIcon = ':godmode:' if botIcon == '' else botIcon
    payload = {'text': text, 'username': botName, 'channel': channel}

    if '://' in botIcon:
        payload['icon_url'] = botIcon

    else:
        payload['icon_emoji'] = botIcon
    payload = json.dumps(payload)
    print('Posting to Slack...')
    cmd = 'curl -X POST --data-urlencode \'payload=%s\' %s' % (payload, SLACK_HOOK)
    pesh(cmd)
    return

def fix_build_tools_version():
    gradleFiles = pesh('grep -Ril "buildToolsVersion" . | grep "android/build\.gradle"', out='all')

    for gradleFile in gradleFiles:
        lines = []

        with open(gradleFile) as gf:

            for line in gf:

                if 'buildToolsVersion' in line:
                    #print('Old line: %s' % line)
                    line = re.sub(r'\d+\.\d+\.\d+', '25.0.0', line)
                    #print('New line: %s' % line)
                lines.append(line)

        with open(gradleFile, 'w') as gf:

            for line in lines:
                gf.write(line)

def curr_time():
    return time.strftime('%Y%m%d_%H%M', time.gmtime())

def get_path(pattern, start='/home'):
    # TODO: may need to change to work with iOS
    return pesh('find %s |grep %s' % (start, pattern), out=0)
    path = ''

    with open(TMP_FILE, 'w') as of:  # wb?
        child = pesh('find %s |grep %s' % (start, pattern), out=of)
    with open(TMP_FILE) as f:
        path = f.readline().strip()
    return path

def run_shript(scriptName):
    # run a shell script blindly
    print('Running %s...' % scriptName)
    with open(scriptName) as sc:
        for line in sc:
            if not line == '':
                pesh(line)
    return

def main():
    cmds = sys.argv

    if len(cmds) == 1:
        print('Nothing to do :\'(')
        return

    if cmds[1] == 'runsh':
        # treat 2nd arg as a Shell script
        run_shript(cmds[2])
        return
    if cmds[1] == 'deploy':
        # 2nd arg is a pattern to find something to deploy

        if not 'into \'master\'' in pesh('git log |head', 4):
            # only deploy if detected master branch
            print('Not building on master branch. Aborting deploy...')
            return
        target = get_path('app-release')  # = cmds[2]
        dlURL = mega_deploy(target)['dlURL']
        testURL = appetize_deploy(target)['testURL']
        msg = 'Latest app version can be downloaded at <%s> \nand tested at <%s>' % (dlURL, testURL)
        slack_post(text=msg)
        return

    if cmds[1] == 'slack':
        # send a message to Slack
        slack_post()
        return

    if cmds[1] == 'fix-btv':
        fix_build_tools_version()
        return

if __name__ == '__main__':
    main()
