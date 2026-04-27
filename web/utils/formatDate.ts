import moment from "moment";

const formatDate = (date: string): string => {
  const formattedDate: string = moment(date).utc().format("DD/MM/YY");

  return formattedDate;
};

export default formatDate;
