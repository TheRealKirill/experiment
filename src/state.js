import { rerender } from './index';

export let store = {
  state: {
    infoPost: [
      {
        backColor: 'red',
        data: '12.09.2019',
      },
      //{
      //  backColor: 'black',
      //  data: '5.09.2019',
      //},
      //{
      //  backColor: 'green',
      //  data: '12.12.2019',
      //},
      //{
      //  backColor: 'red',
      //  data: '12.09.2017',
      //},
    ],
    comments: [
      {
        text: 'qwdqwd',
      },
      {
        text: 'Kirill Klyachin',
      },
    ],

    newCommentText: '',
  },

  dispatch(action) {
    if (action.type === 'INPUT-NEW-TEXT-COMMENT') {
      console.log(action.newText);
      this.state.newCommentText = action.newText;
      rerender(store);
    } else if (action.type === 'ADD-NEW-COMMENT') {
      console.log(this.state.newCommentText);
      this.state.comments.push({
        text: this.state.newCommentText,
      });
      this.state.newCommentText = '';
      rerender(store);
    }
  },
};

window.store = store.state.newCommentText;
