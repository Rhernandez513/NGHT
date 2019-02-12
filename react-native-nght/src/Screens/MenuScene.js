import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableNativeFeedback,
  TouchableHighlight,
  Alert,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';

import Images from '../Assets/images';

import { Navbar } from 'navbar-native';
import Accordion from 'react-native-collapsible/Accordion';
import {
    orderInc,
    orderDec,
    orderUpdate,
    orderInit,
} from '../Actions/Actions';

export default class MenuScene extends Component {
    _menu = null;
    _venue = null;
    _order = {};

    _addOrder(item) {

        if (item in this._order) {
            this._order.item
        }
    }

    render() {
        this._venue = this.props.store.getState().venue;
        this._menu = this.props.store.getState().venueMenu[this._venue.id];
        store = this.props.store;
        //this.props.store.dispatch(menuLoad(menu));
        return (
            <View style={styles.outerDiv}>
                <Navbar
                  title={"Menu"}
                  left={{
                    icon: "ios-arrow-back",
                    onPress: () => this.props.navigator.pop()
                  }}
                  right={[{
                    icon: "ios-search",
                  },{
                    icon: "ios-list-box",
                  }]}
                />
                <ScrollView>
                    {
                        !this._menu ?
                            <Text style={styles.defaulttext}> No menu available for {this._venue.name} </Text>
                        :
                            this._menu.menu.map((item) => {
                                return (
                                    <View key={item.title}>
                                        <Text style={styles.defaulttext}> {item.title} </Text>
                                        <Text style={styles.defaulttext}> {item.description} </Text>
                                        {/*<MenuAccordionView items={item.content} store={this.props.store} label={item.title} />*/}
                                        <MenuListModalView items={item.content} store={store} />
                                        <Text style={styles.defaulttext}> -------------- </Text>
                                    </View>
                                );
                            })
                    }
                </ScrollView>
                <Text style={styles.defaulttext}> Place Order </Text>
            </View>
            );
    }
}

//<MenuListModalView item={item} />
class MenuListModalView extends Component {
    constructor(props) {
        super(props);

        /*this.setState({
            modalVisible: false,
            itemId: '',
        })*/
        this._orderModal('', false, -5)
    }

    _orderModal(id, visible, update=-10) {
        //alert('26 '+id)
        //alert('entering ORDER_UPDATE\n'+JSON.stringify(this.props.store.getState().order, null, 2)+'\n'+update)
        this.props.store.dispatch(orderUpdate({itemId: id, modalVisible: visible, update: update}))
        //alert('exited ORDER_UPDATE\n'+JSON.stringify(this.props.store.getState().order, null, 2))
        if (update != -5) {this.forceUpdate()}
    }

    render() {
        //alert('25 ' + JSON.stringify(this.props.store.getState().order, null, 2))
        return (
            <View style={styles.container}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.props.store.getState().order.modalVisible}
                onRequestClose={() => { this._orderModal('', false, -4) }}>
            <View style={styles.modal}>
                <Text> {
                    this.props.store.getState().order[this.props.store.getState().order['currentId']].name
                } </Text>
                <TouchableHighlight onPress={() => { this._orderModal(this.props.store.getState().order['currentId'], true, -1) }}>
                    <Text> - </Text>
                </TouchableHighlight>
                <TextInput
                    value={''+this.props.store.getState().order[this.props.store.getState().order['currentId']].quantity}
                    onChangeText={(quantity) => this._orderModal(this.props.store.getState().order['currentId'], true, int(quantity) >= 0 ? int(quantity) : -10)}
                    maxLength={2}
                    keyboardType='numeric'
                />
                <TouchableHighlight onPress={() => { this._orderModal(this.props.store.getState().order['currentId'], true, -2) }}>
                    <Text> + </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { this._orderModal('', false, -3) }}>
                    <Text> Add </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => { this._orderModal('', false, -4) }}>
                    <Text> Cancel </Text>
                </TouchableHighlight>
            </View>
            </Modal>
            <ScrollView>
            {this.props.items.map((subitem) => {
                subitem.id = hashCode(subitem.name);  // TODO: pass and append menu name
                this.props.store.dispatch(orderInit({
                    id: subitem.id,
                    name: subitem.name,
                    price: subitem.price,
                    quantity: 0,
                    available: subitem.available,
                }))
                return (
                    <TouchableHighlight key={subitem.id} onPress={() => this._orderModal(subitem.id, true)}>
                        <View>
                            <Text style={subitem.available == true ? styles.defaulttext : styles.ranouttext}>
                                {subitem.name}  {subitem.price}
                            </Text>
                            {/*<Text style={subitem.available == true ? styles.defaulttext : styles.ranouttext}>
                            </Text>*/}
                        </View>
                    </TouchableHighlight>
                )
            })}
            </ScrollView>
            </View>
        );
    }
}
/*
class Menu AccordionView extends Component {
    constructor(props) {
        super(props);

        this.setState({trigger: false})
    }


    _renderHeader(item) {
        return (
            <View>
                <Text style={item.available == true ? styles.defaulttext : styles.ranouttext}>
                    {item.name}
                </Text>
            </View>
        );
    }

    _renderContent(item) {
        //this.setState({quantity: store.getState().order[hashCode(item.name)] || 0})
        return (
            <View>
                <Text style={styles.defaulttext}> {item.description} </Text>
                <Text style={styles.defaulttext}> {item.price} </Text>
                <TouchableHighlight onPress={(item) => {store.dispatch(decOrder(hashCode(item.name))); this.setState({quantity: store.getState().order[hashCode(item.name)]})}}>
                    <Text style={styles.defaulttext}> - </Text>
                </TouchableHighlight>
                <Text style={styles.defaulttext}> ? </Text>
                <TouchableHighlight onPress={() => {store.dispatch(incOrder(hashCode(item.name))); this.setState({quantity: store.getState().order[hashCode(item.name)]})}}>
                    <Text style={styles.defaulttext}> + </Text>
                </TouchableHighlight>
            </View>
        );
    }

    _onChange(index) {
        //this.setState({trigger: !this.state.trigger || true})
    }

    render() {
        //alert('17'+this.props.store)
        this._items = this.props.items;
        return (
            <Accordion
                sections={this.props.items}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent.bind(this)}
                onChange={this._onChange.bind(this)}
            />
        );
    }
}
*/
store = null;

function hashCode(str) {
  for(var ret = 0, i = 0, len = str.length; i < len; i++) {
    ret = (31 * ret + str.charCodeAt(i)) << 0;
  }
  return ret;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  submitbutton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#333333',
    padding: 10,
  },
  defaulttext: {
    fontSize: 20,
    height: 50,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  outerDiv: {
    backgroundColor: 'black',
    flex: 1,
  },
  innerDiv: {
    justifyContent:'center',
    padding: 10,
  },
  ranouttext: {
    fontSize: 15,
    height: 50,
    textAlign: 'center',
    margin: 10,
    color: 'red'
  },
  modal: {
      backgroundColor: 'rgba(255, 255, 255, 1.0)',
      marginTop: 100,
  }
});

// snippets
/*
{
    item.content.map((subitem) => {
        return (
            <View>
                <Text style={subitem.available == true ? styles.defaulttext : styles.ranouttext}>
                    {subitem.name}  {subitem.price}
                </Text>
                <Text style={subitem.available == true ? styles.defaulttext : styles.ranouttext}>
                    {subitem.description}
                </Text>
            </View>
        )
    })
}
*/
