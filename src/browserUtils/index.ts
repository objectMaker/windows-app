import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration);

export function formatDuration(seconds:number){
    return dayjs.duration(seconds, 'second').format('HH:mm:ss');
}