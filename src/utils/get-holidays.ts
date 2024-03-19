import colombianHolidaysByYear from "colombia-holiday";

type Holidays = {
  holiday: string
  celebrationDay: string
  holidayName: string
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function calculateHolidayCountNext(holidayDate: string) {
  // Convert the holiday date to a Date object
  const holiday = new Date(holidayDate);

  // Get the current date
  const today = new Date();

  // Set the time part of both dates to 00:00:00 to compare only the dates
  holiday.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const timeDifference = holiday.getTime() - today.getTime(); // Use getTime() to get the time value in milliseconds

  // Convert the difference to days
  const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));

  return dayDifference;
}

export const getHolidays = () => {
  const currentYear = new Date().getFullYear()
  const currentDate = new Date()

  const currentYearHolidays = colombianHolidaysByYear(currentYear) as Holidays[]

  const fullHolidays = currentYearHolidays.map((holiday, index) => {
    return {
      index,
      diff: new Date(currentDate).getTime() - new Date(holiday.holiday).getTime(),
      holidayLocaleDate: formatDate(holiday.holiday),
      holidayCountNext: calculateHolidayCountNext(holiday.holiday),
      holidayDate: holiday.holiday,
      holidayName: holiday.holidayName,
    }
  })

  const [nextHoliday] = fullHolidays.filter(nh => (nh.diff) <= 0)

  return {
    count: fullHolidays.length,
    holidays: fullHolidays.map(h => ({ ...h })),
    nextHoliday: nextHoliday ? { ...nextHoliday } : null,
    isHolidayToday: nextHoliday.holidayCountNext === 0
  }
}