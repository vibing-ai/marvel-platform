const addEditToHistory = (dispatch, markdownContent, type) => {
  if (!markdownContent || !type) {
    console.error('Invalid edit history entry');
    return;
  }

  dispatch(
    tools.actions.addStateToEditHistory({
      content: markdownContent,
      type,
      timestamp: Date.now(),
    })
  );
};
