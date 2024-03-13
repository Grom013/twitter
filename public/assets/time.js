export default function timeFn(min) {
  function conjugationMinutes(min) {
    const remainderOfTenMinutes = min % 10;
    const remainderOfHundredMinutes = min % 100;
    if (remainderOfHundredMinutes >= 11 && remainderOfHundredMinutes <= 20) {
      return `${min} минут назад`;
    }
    if (remainderOfTenMinutes === 1) {
      return `${min} минуту назад`;
    } if (remainderOfTenMinutes >= 2 && remainderOfTenMinutes <= 4) {
      return `${min} минуты назад`;
    }
    return `${min} минут назад`;
  }

  const hour = Math.floor(min / 60);

  function conjugationHours(hour) {
    const remainderOfTenHours = hour % 10;
    if (hour === 1 || remainderOfTenHours === 1) {
      return `${hour} час назад`;
    } if ((hour >= 2 && hour <= 4) || (remainderOfTenHours <= 4 && remainderOfTenHours >= 2)) {
      return `${hour} часа назад`;
    } if (hour >= 5 && hour <= 20) {
      return `${hour} часов назад`;
    }
  }

  const day = Math.floor(hour / 24);

  function conjugationDays(day) {
    const remainderOfTenDays = day % 10;
    const remainderOfHundredDays = day % 100;
    if (remainderOfHundredDays >= 11 && remainderOfHundredDays <= 20) {
      return `${day} дней назад`;
    } if (remainderOfTenDays === 1) {
      return `${day} день назад`;
    } if (remainderOfTenDays >= 2 && remainderOfTenDays <= 4) {
      return `${day} дня назад`;
    }
    return `${day} дней назад`;
  }

  if (min < 60) {
    return conjugationMinutes(min);
  } if (min >= 60 && min < 1440) {
    return conjugationHours(hour);
  } if (day >= 1 && day <= 365) {
    return conjugationDays(day);
  }
  return 'более года назад';
}
