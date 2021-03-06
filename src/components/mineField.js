import React from "react"
import {View, StyleSheet} from "react-native"
import Field from "./field"

const styles = StyleSheet.create({
    container: {
        //flexDirection: "row",
        backgroundColor: "#eee"
    }
})

export default props => {

    const rows = props.board.map((row, r) => {
        const columns = row.map((field, c) => {
            return <Field {...field} key={c} 
                onOpen={() => props.onOpenField(r, c)}
                onSelect={() => props.onSelect(r, c)}></Field>
        })
        return <View key={r} style={{flexDirection:"row"}}>{columns}</View>
    })

    return <View style={styles.container}>{rows}</View>

}

