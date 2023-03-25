import React from "react";
import { Box, Typography } from "@mui/material";

const FormatDate = ({ date, locale }) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const hour = `${date.getHours()}`.padStart(2, 0);
  const min = `${date.getMinutes()}`.padStart(2, 0);

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0)
    return (
      <Box>
        <Typography>Today</Typography>
        <Typography>
          {hour}:{min}
        </Typography>
      </Box>
    );
  if (daysPassed === 1)
    return (
      <Box>
        <Typography>Yesterday</Typography>
        <Typography>
          {hour}:{min}
        </Typography>
      </Box>
    );
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

export default FormatDate;
