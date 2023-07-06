import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  calendarStyle: {
    borderRadius: 8,
  },
  modalWrap: {
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 50,
    paddingbottom: 8,
    backgroundColor: '#fff',
  },
  modalButtonWrap: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 12,
  },
  modalButton: {
    width: 100,
    height: 32,
    backgroundColor: '#f08080',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#111',
  },
  modalTransparentButton: {
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  contentsWrap: {
    paddingVertical: 24,
    paddingHorizontal: 30,
    height: '100%',
  },
  contentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    flex: 1,
    paddingRight: 12,
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
    alignItems: 'center',
  },
  tagWrap: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    marginRight: 8,
    marginBottom: 8,
    height: 32,
  },
  tagInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    width: '80%',
    paddingBottom: 10,
  },
  tagText: {
    fontWeight: '500',
  },
  closeIconBox: {
    width: 12,
    height: 14,
    marginLeft: 4,
  },
});

export default styles;
