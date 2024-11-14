export interface ColorScheme {
  primary: string;     // primary color
  secondary: string;   // secondary color
  tertiary: string;    // tertiary color

  highlight: string;   // highlight color
  bgHighlight: string; // background highlight color
  bgShadow: string;    // background shadow color

  text: string;        // text color
}

// dark color palette
export const DarkColorScheme: ColorScheme = {
  primary: '#222222',
  secondary: '#E2E2E2',
  tertiary: '#775A97',
  highlight: '#201C4E',
  bgHighlight: '#201B4D',
  bgShadow: '#1C1224',
  text: '#FFFFFF',
}

// light color palette
export const LightColorScheme: ColorScheme = {
  primary: '#E5E5E5',
  secondary: '#D1D1D1',
  tertiary: '#BFBFBF',
  highlight: '#201C4E',
  bgHighlight: '#FFFFFF',
  bgShadow: '#EBEBEB',
  text: '#000000',
}

// PeachFuzz color palette
export const PeachFuzz: ColorScheme = {
  primary: '#ffbe98',
  secondary: '#ffbe98',
  tertiary: '#ffbe98',
  highlight: '#ffffff',
  bgHighlight: '#ffdeb8',
  bgShadow: '#ff9e78',
  text: '#000000',
}

