import { DailyForecast } from "./dailyForecast.model";

export interface Post {
    Headline:{
        Text:string
    },
    DailyForecasts:DailyForecast[]
}