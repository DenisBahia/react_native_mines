/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
import params from "./src/params"
import MineField from "./src/components/mineField"
import Header from "./src/components/header"
import LevelSelection from "./src/screens/levelSelection"
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hasExplosion,
  wowGame,
  showMines,
  invertFlag,
  flagsUsed} from "./src/functions"

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  onOpenField = (row, column) => {

    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hasExplosion(board)
    const won = wowGame(board)

    if (lost){
      showMines(board)
      Alert.alert("Perdeu!")
    }

    if (won){
      Alert.alert("Venceu!")
    }

    this.setState({board, lost, won})

  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  onSelect = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wowGame(board)
    if (won){
      Alert.alert("Venceu!")
    }
    this.setState({board, won})
  }

  render() {
    return (
      <View style={styles.container}>

        <LevelSelection isVisible={this.state.showLevelSelection}
        onLevelSelected={this.onLevelSelected}
        onCancel={() => this.setState({showLevelSelection: false})}
        ></LevelSelection>

        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
        onNewGame={() => this.setState(this.createState())} 
        onFlagPress={() => this.setState({showLevelSelection: true})}
        ></Header>

        <View style={styles.board}>
          <MineField board={this.state.board} 
          onOpenField={this.onOpenField}
          onSelect={this.onSelect}
          ></MineField>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: "center",
    backgroundColor: "#aaa"
  }
});
