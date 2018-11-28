import React from "react"
import {View, StyleSheet, Text, TouchableWithoutFeedback} from "react-native"
import params from "../params"
import Mine from "./mine"
import Flag from "./flag";

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },
    regular: {
        backgroundColor: "#999",
        borderLeftColor: "#CCC",
        borderTopColor: "#CCC",
        borderRightColor: "#333",
        borderBottomColor: "#333",
    },
    opened: {
        backgroundColor: "#999",
        borderColor: "#777",
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        fontWeight: "bold",
        fontSize: params.fontSize
    },
    exploded: {
        backgroundColor: "red",
        borderColor: "red"
    },
    flagged: {

    }
})

export default props => {

    const {mined, opened, nearMines, exploded, flagged} = props

    const styleField = [styles.field]

    //outros estilos
    if (opened) styleField.push(styles.opened)
    if (flagged) styleField.push(styles.flagged)
    if (exploded) styleField.push(styles.exploded)
    if (!opened && !exploded) styleField.push(styles.regular)

    let color = null
    if (nearMines > 0){
        if (nearMines === 1) color = "#2a28d7"
        if (nearMines === 2) color = "#2b520f"
        if (nearMines > 2 && nearMines < 6) color = "#f9860a"
        if (nearMines >= 6) color = "#f221a9"
    }

    return (
        <TouchableWithoutFeedback onPress={props.onOpen}
        onLongPress={props.onSelect}>
            <View style={styleField}>
                {!mined && opened && nearMines > 0 ? 
                    <Text style={[styles.label, {color: color}]}>{nearMines}</Text> 
                    : false}
                {mined && opened ? <Mine></Mine>: false}
                {flagged && !opened ? <Flag></Flag> : false}
            </View>  
        </TouchableWithoutFeedback>
    )

}