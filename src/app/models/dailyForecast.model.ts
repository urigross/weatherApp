export interface DailyForecast {
    IconPhrase: string,
    Temperature: {
        Maximum: {
            Value: number
        },
        Minimum: {
            Value: number
        }
        text: string,
    }
    Day: {
        IconPhrase: string,
        Icon: number
    }
    Date: Date,
}