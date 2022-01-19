  export function matchLaw(state, value) {
    console.log(state);
    console.log(value);
  return (
    state.chapter.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.ipc.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}