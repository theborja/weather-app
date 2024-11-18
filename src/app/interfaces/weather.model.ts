

export interface Forecast {
    location?: Location;
    current?:  Current;
    forecast?: ForecastClass;
}

export interface Current {
    last_updated_epoch: number;
    last_updated:       string;
    temp_c:             number;
    is_day:             number;
    condition:          Condition;
    wind_kph:           number;
    wind_degree:        number;
    wind_dir:           string;
    precip_mm:          number;
    humidity:           number;
    cloud:              number;
    feelslike_c:        number;
}

export interface Condition {
    text: Text;
    icon: string;
    code: number;
}

export enum Text {
    LightDrizzle = "Light drizzle",
    LightRain = "Light rain",
    ModerateRain = "Moderate rain",
    Overcast = "Overcast ",
    PatchyRainNearby = "Patchy rain nearby",
}

export interface ForecastClass {
    forecastday: Forecastday[];
}

export interface Forecastday {
    date:       Date;
    date_epoch: number;
    day:        Day;
    astro:      Astro;
    hour:       Hour[];
}

export interface Astro {
    sunrise:           string;
    sunset:            string;
    moonrise:          string;
    moonset:           string;
    moon_phase:        string;
    moon_illumination: number;
    is_moon_up:        number;
    is_sun_up:         number;
}

export interface Day {
    maxtemp_c:            number;
    mintemp_c:            number;
    avgtemp_c:            number;
    maxwind_kph:          number;
    totalprecip_mm:       number;
    totalsnow_cm:         number;
    avgvis_km:            number;
    avghumidity:          number;
    daily_will_it_rain:   number;
    daily_chance_of_rain: number;
    daily_will_it_snow:   number;
    daily_chance_of_snow: number;
    condition:            Condition;
    uv:                   number;
}

export interface Hour {
    time_epoch:     number;
    time:           string;
    temp_c:         number;
    temp_f:         number;
    is_day:         number;
    condition:      Condition;
    wind_mph:       number;
    wind_kph:       number;
    wind_degree:    number;
    wind_dir:       string;
    pressure_mb:    number;
    pressure_in:    number;
    precip_mm:      number;
    precip_in:      number;
    snow_cm:        number;
    humidity:       number;
    cloud:          number;
    feelslike_c:    number;
    feelslike_f:    number;
    windchill_c:    number;
    windchill_f:    number;
    heatindex_c:    number;
    heatindex_f:    number;
    dewpoint_c:     number;
    dewpoint_f:     number;
    will_it_rain:   number;
    chance_of_rain: number;
    will_it_snow:   number;
    chance_of_snow: number;
    vis_km:         number;
    vis_miles:      number;
    gust_mph:       number;
    gust_kph:       number;
    uv:             number;
    short_rad:      number;
    diff_rad:       number;
}

export interface Location {
    name:            string;
    region:          string;
    country:         string;
    lat:             number;
    lon:             number;
    tz_id:           string;
    localtime_epoch: number;
    localtime:       string;
}
