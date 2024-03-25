const {ipcRendererSend} = (window as any).electron

export default function CloseButton() {
  function handleClick() {
    ipcRendererSend('close-app')
  }

  return (
    <button onClick={()=>handleClick()}>点击关闭</button>
  );
}