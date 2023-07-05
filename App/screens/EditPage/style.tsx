import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  calendarStyle: {
    borderRadius: 8,
  },
  deleteModalWrap: {
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 50,
    paddingbottom: 8,
    backgroundColor: '#fff',
  },
  deleteModalButtonWrap: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 12,
  },
  deleteModalButton: {
    width: 100,
    height: 32,
    backgroundColor: '#f08080',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#111',
  },
  deleteModalFirstButton: {
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  contentsWrap: {
    paddingVertical: 24,
    paddingHorizontal: 30,
  },
  contentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  noneCheck: {
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 2,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default styles;
