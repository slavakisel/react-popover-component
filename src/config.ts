const config = {
  popOverStyles: {
    topRight: 'arrow-top-right',
    topLeft: 'arrow-top-left',
    topCenter: 'arrow-top-center',
    bottomRight: 'arrow-bottom-right',
    bottomLeft: 'arrow-bottom-left',
    bottomCenter: 'arrow-bottom-center',
    leftTop: 'arrow-left-top',
    leftCenter: 'arrow-left-center',
    leftBottom: 'arrow-left-bottom',
    rightTop: 'arrow-right-top',
    rightCenter: 'arrow-right-center',
    rightBottom: 'arrow-right-bottom',
    default: 'arrow-bottom-right',
  },
  left: {
    topCenter: '-50%',
    topRight: '10%',
    topLeft: '-10%',
    bottomCenter: '-50%',
    bottomRight: '-90.9%',
    bottomLeft: '-10%',
    leftTop: '100%',
    leftCenter: '100%',
    leftBottom: '100%',
    rightTop: '-100%',
    rightCenter: '-100%',
    rightBottom: '-100%',
  },
  top: {
    topLeft: '100%',
    topCenter: '5px',
    topRight: '5px',
    bottomRight: '-100%',
    bottomLeft: '-100%',
    bottomCenter: '-100%',
    leftTop: '-90%',
    leftCenter: '5px',
    leftBottom: '-10%',
    rightTop: '90%',
    rightCenter: '5px',
    rightBottom: '-10%',
    default: '-100%',
  },
  warnings: {
    missingContent: 'Write some children elements to render content in the Popover',
  }
};

export const Arrows = [
  'topRight',
  'topLeft',
  'bottomRight',
  'bottomLeft',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
  'topCenter',
  'bottomCenter'
];

export default config;
