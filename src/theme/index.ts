const pallete = [
  {
    // orange
    text: "#f97316",
    bgColor: (opacity: number) => `rgba(251, 146, 60, ${opacity})`,
    bgDisable: '#D0D5DD'
  },
  {
    // dark gray
    text: "#334155",
    bgColor: (opacity: number) => `rgba(30, 41, 59, ${opacity})`,
    bgDisable: '#D0D5DD'
  },
  {
    // purple
    text: "#7c3aed",
    bgColor: (opacity: number) => `rgba(167, 139, 250, ${opacity})`,
    bgDisable: '#D0D5DD'
  },
  {
    // green
    text: "#009950",
    bgColor: (opacity: number) => `rgba(0, 179, 89, ${opacity})`,
    bgDisable: '#D0D5DD'
  },
  {
    // teal
    text: "#14b8a6",
    bgColor: (opacity: number) => `rgba(45, 212, 191, ${opacity})`,
    bgDisable: '#D0D5DD'
  },
  {
    // red
    text: "#dc2626",
    bgColor: (opacity: number) => `rgba(248, 113, 113, ${opacity})`,
    bgDisable: '#D0D5DD'
  },
];

export const themeColors = {
  ...pallete[4],
};
