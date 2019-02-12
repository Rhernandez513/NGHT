const initStore = {
    auth: 'false',
    loggedIn: 'false',
    service: "",
    user_data: {
      name: "",
      first_name: "",
      last_name: "",
      email: "",
      age_range: "",
      link: "",
      picture: "",
      gender: "",
      locale: "",
      timezone: ""
    },
    venueInfo: [
        {
            name: 'The Spokenword Lounge',
            address: '2423 E 75th St, South Shore',
            phone: '+1 773 123 4567',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            thumb: '',
            location: {
                    latitude: 41.7588146,
                    longitude: -87.5655092
                }
        },
        {
            name: 'Club Escape',
            address: '1530 E 75th St, South Shore',
            phone: '+1 773 123 4567',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            thumb: '',
            location: {
                    latitude: 41.7590093,
                    longitude: -87.58715049999999
                }
        },
        {
            name: 'Falcon Inn',
            address: '1601 E 53rd St, Hyde Park',
            phone: '+1 773 123 4567',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            thumb: '',
            location: {
                    latitude: 41.7993858,
                    longitude: -87.5862277
                }
        },
        {
            name: 'Zenda Tap',
            address: 'N560 Zenda Rd, Lake Geneva',
            phone: '+1 773 123 4567',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            thumb: '',
            location: {
                    latitude: 42.5242112,
                    longitude: -88.48210879999999
                }
        },
        {
            name: 'Ireland\'s Pub',
            address: '6511 N. Sheridan Rd, Chicago',
            phone: '+1 773 123 4567',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            thumb: '',
            location: {
                    latitude: 42.000535,
                    longitude: -87.659264
                }
        }
    ],
    venueMenu: {
        'll42.000535-87.659264': {
            name: 'Ireland\'s Pub',
            menu: [
                {
                    title: 'Food Menu',
                    description:'Elevated Grub - Paninis',
                    content: [
                        {
                            name: 'THE RAMBLER',
                            price: 6.00,
                            description: 'Turkey, pepper jack, tomatoes, spinach, avocado',
                            available: true
                        },
                        {
                            name: 'The Red Line',
                            price: 6.00,
                            description: 'Chicken, bacon, ranch, mozzarella',
                            available: true
                        }
                    ]
                },
                {
                    title: 'Drink Menu',
                    description: 'Featured Beverages',
                    content: [
                        {
                            name: "O\'Hara\'s Irish Pale Ale",
                            price: 6.03,
                            description: "A Contemporary style IPA...",
                            available: true
                        },
                        {
                            name: "Awesome Orange Wine",
                            price: 8.59,
                            description: "This stuff is so good! Must try!!",
                            available: false
                        }
                    ]
                }
            ]
        }
    },
    order: {itemName: '', modalVisible: false}
}

/*
    Todo:
    - Break into multiple reducers
*/

export default function reducer (state = initStore, action) {
    switch (action.type) {
        case 'APP_INIT':
            // should be an async function
            new_state = {
              ...state,
              venueInfo: initStore.venueInfo,
              venueMenu: initStore.venueMenu,
              navigator: action.data.navigator
            }
            return new_state

        case 'ACCT_SIGN_IN':
            return Object.assign({}, state, {
              ...state,
              user_data: {
                name: action.service.user_data.name,
                first_name: action.service.user_data.first_name,
                last_name: action.service.user_data.last_name,
                email: action.service.user_data.email,
                age_range: action.service.user_data.age_range,
                link: action.service.user_data.link,
                picture: action.service.user_data.picture,
                gender: action.service.user_data.gender,
                locale: action.service.user_data.locale,
                timezone: action.service.user_data.timezone
              },
              loggedIn: action.service.loggedIn,
              auth: action.service.auth,
              service: action.service.service
            })

        case 'ACCT_SIGN_OUT':
            return Object.assign({}, state, {
                loggedIn: 'false'
            })

        case 'ACCT_SIGN_UP':
            return {...state, auth: {
                email: {
                    name: action.data.name,
                    address: action.data.address,
                    salt: action.data.salt,
                    passwordHash: action.data.passwordHash
                }
            }}

        case 'VENUE_SELECT':
            return {...state, venue: action.venue}

        case 'ORDER_INC':
            order = state['order'];

            if (order == undefined) {
                order = {}
            }
            //alert('18 '+order[action.item]);

            if (order[action.item] == undefined) {
                order[action.item] = 0
            }
            order[action.item] += 1
            return {...state, order}

        case 'ORDER_DEC':
            order = state['order']

            if (order == undefined) {
                order = {}
            }
            //alert('19 '+order[action.item])

            if (order[action.item] == undefined) {
                order[action.item] = 0
            }
            if (order[action.item] >= 1) {order[action.item] -= 1;}
            return {...state, order}

        case 'ORDER_UPDATE':
            // update: -1 to decrement, -2 to increment, >=0 to set, -3 to add, -4 to cancel
            order = state['order']
            //alert(JSON.stringify(order, null, 2) + '\n' + JSON.stringify(action, null, 2))

            if (order == undefined) {
                order = {
                    ...order,
                    modalVisible: false,
                    oldQuantity: 0,
                }
            }/*
            else {
                order = {
                    modalVisible: action.item.modalVisible,
                    itemId: action.item.itemId,
                }
            }*/
            if (order['currentId'] == undefined) {
                // make a fake item as placeholder
                order['currentId'] = '000000'
                order['000000'] = {
                    name: 'dummy',
                    price: 10000,
                    quantity: 0,
                    available: false,
                }
            }
            order['modalVisible'] = action.item.modalVisible
            if (order[action.item.itemId] == undefined) {
                // no item selected; short circuit out
                //alert('nothing to work with')
                return {...state, order}
            }

            if (order['currentId'] != action.item.itemId) {
                // another item was selected
                //alert('setting up the current item\'s order')
                //alert('28\n'+JSON.stringify(order))
                order['currentId'] = action.item.itemId
                order['oldQuantity'] = order[order['currentId']].quantity
                //return {...state, order}
            }

            if (order[action.item.itemId]['quantity'] == undefined) {
                // first time accessing that item this session
                //alert('initting quantity for this order')
                order[action.item.itemId]['quantity'] = 0
            }

            if (action.item.update == -1) {
                // decrement button pressed
                //alert('decrementing order\n'+JSON.stringify(order, null, 2))
                order[action.item.itemId]['quantity'] <= 0 ? order[action.item.itemId]['quantity'] = 0 : order[action.item.itemId]['quantity'] -= 1
            }

            if (action.item.update == -2) {
                // increment button pressed
                //alert('incrementing order\n'+JSON.stringify(order, null, 2)+'\n'+JSON.stringify(action, null, 2))
                order[action.item.itemId]['quantity'] >= 99 ? order[action.item.itemId]['quantity'] = 99 : order[action.item.itemId]['quantity'] += 1
                //alert('order incremented\n'+JSON.stringify(order, null, 2))
            }

            if (action.item.update == -3) {
                // add button pressed; save the quantity
                //alert('quantity to be saved')
            }

            if (action.item.update == -4) {
                // cancel button pressed; restore the old quantity
                //alert('discard modified quantity')
                order[action.item.itemId]['quantity'] = order['oldQuantity']
            }

            if (action.item.update >= 0) {
                // quantity entered
                //alert('quantity entered manually')
                order[action.item.itemId]['quantity'] = action.item.update
            }
            state = {...state, order: order}
            //alert('exiting ORDER_UPDATE:\n'+JSON.stringify(state.order, null, 2))
            return state

        case 'ORDER_INIT':
            order = state['order']

            if (order == undefined) {
                order = {
                    modalVisible: false,
                }
            }
            item = {
                name: action.item.name,
                price: action.item.price,
                quantity: action.item.quantity,
                available: action.item.available,
            }
            order[action.item.id] = item
            return {...state, order}

        default:
            return state;
    }
};
