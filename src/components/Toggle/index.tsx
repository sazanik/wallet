import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { ToggleIds } from '../../constants/ToggleIds';

interface Props {
  options: Record<ToggleIds, string>;
  activeId?: ToggleIds;
  onToggle: (id: ToggleIds) => void;
}

export const Toggle = ({ options, onToggle, activeId = 0 }: Props) => {
  const updateToggleData = useCallback(
    (id: 0 | 1) => {
      if (onToggle) {
        onToggle(id);
      }
    },
    [onToggle],
  );

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: activeId ? colors.red : colors.violet },
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateToggleData(0)}
        style={[
          styles.option,
          { backgroundColor: activeId ? colors.red : colors.white },
        ]}>
        <Text style={{ color: activeId ? colors.white : colors.black }}>
          {options['0']}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateToggleData(1)}
        style={[
          styles.option,
          { backgroundColor: !activeId ? colors.violet : colors.white },
        ]}>
        <Text style={{ color: !activeId ? colors.white : colors.black }}>
          {options['1']}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    width: 200,
    padding: 4,
    borderRadius: 25,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
