import React from 'react';
import {StyleSheet, View, Image, Pressable, Text} from 'react-native';
import dayjs from 'dayjs';

const BackIcon = require('../assets/icon/ic_back.png');
const DateIcon = require('../assets/icon/ic_date.png');
const DeleteIcon = require('../assets/icon/ic_delete.png');

const Header = ({
  onDatePress,
  onDeletePress,
  onBackPress,
  selectDate,
}: {
  onDatePress: () => void;
  onDeletePress: () => void;
  onBackPress: () => void;
  selectDate: string;
}) => {
  // 오늘 날짜
  const todayYear = dayjs().year();
  const todayMonth = dayjs().month() + 1;
  const todayDate = dayjs().date();
  const today = `${todayYear}-${todayMonth}-${todayDate}`;
  // 선택된 날짜
  const expired_at = dayjs(selectDate);
  // 날짜 차이
  const result = expired_at.diff(today, 'day', true);

  const dateHandler = () => {
    if (result <= 0 && result > -7) {
      if (result === 0) {
        return '오늘';
      } else {
        return `${Math.abs(result)}일 연체`;
      }
    } else if (result > 0 && result < 7) {
      return `${result}일 남음`;
    } else {
      return `${dayjs(selectDate).month() + 1}월 ${dayjs(selectDate).date()}일`;
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.headerIconWrap} onPress={onBackPress}>
        <Image source={BackIcon} style={styles.headerIcon} />
      </Pressable>
      <Pressable style={styles.headerDateIconWrap} onPress={onDatePress}>
        <Image source={DateIcon} style={styles.headerIcon} />
        <Text
          style={[styles.headerDataText, result === 1 && styles.activeColor]}>
          {selectDate === '' ? '날짜추가' : dateHandler()}
        </Text>
      </Pressable>
      <Pressable style={styles.headerIconWrap} onPress={onDeletePress}>
        <Image source={DeleteIcon} style={styles.headerIcon} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 6,
  },
  headerIconWrap: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerDateIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  headerDataText: {
    marginLeft: 4,
    fontWeight: 'bold',
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  activeColor: {
    color: 'red',
  },
});
