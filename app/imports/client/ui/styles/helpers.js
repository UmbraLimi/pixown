// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
export function truncate(width) {
  return `
    width: 					${width};
    white-space: 		nowrap;
    overflow: 			hidden;
    text-overflow: 	ellipsis;
  `
}
// ====================================================================


/*import { truncate } from '../style-utils';

// Make this div truncate the text with an ellipsis
const Box = styled.div`
  ${ truncate('250px') }
  background: papayawhip;
`;*/