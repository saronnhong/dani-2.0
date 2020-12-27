import React from 'react';
import { View, StyleSheet } from 'react-native';

const UseWordCount = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
 
});

export default UseWordCount;
