export default function formatMinute(time: number) {
  const hour = ~~(time / 60)
  const minute = time % 60
  return `${hour}시간 ${minute}분`
}
