import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    bottom: 30,
    right: 30,
  },
  listWrap: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
    flex: 1,
    backgroundColor: '#fff',
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
  listTitleWrap: {
    marginTop: 2,
    marginLeft: 8,
    flex: 1,
    paddingRight: 12,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  listTagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  listTag: {
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  listDateText: {
    fontSize: 12,
    fontWeight: '500',
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e07979',
    width: 70,
  },
  deleteIconStyle: {
    width: 20,
    height: 20,
  },
  blackText: {
    textAlign: 'center',
    marginTop: 120,
  },
  activeColor: {
    color: '#c21f1f',
  },
  completeTodo: {
    color: 'gray',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: 'gray',
  },
  activeTag: {
    backgroundColor: '#ffcccc',
  },
});

export default styles;
