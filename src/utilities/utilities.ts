const hourOfDay = new Date().getHours();

// Defining daytime as between 6am to 7pm
export const isDaytime = hourOfDay > 6 && hourOfDay < 19;
