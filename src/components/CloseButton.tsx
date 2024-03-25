const {ipcRendererSend} = (window as any).electron

export default function CloseButton() {
  function handleClick() {
    ipcRendererSend('close-app')
  }
  function handleClickClose() {
    ipcRendererSend('minimize')
  }

  return (
    <>
    <button onClick={()=>handleClick()}>点击关闭</button>
    <button onClick={()=>handleClickClose()}>点击最小化</button>
    </>
  );
}