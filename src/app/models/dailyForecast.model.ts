export interface DailyForecast {
    IconPhrase: string,
    Temperature: {
        Maximum: {
            Value: number
        },
        text: string,
    }
    Day: {
        IconPhrase: string,
        Icon: number
    }
    Date: Date,
}