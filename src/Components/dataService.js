  export function matchLaw(state, value) {
  return (
    state.chapter.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.ipc.toLowerCase().indexOf(value.toLowerCase()) !== -1
  );
}