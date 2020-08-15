/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// This `<reference ...>` directive is necessary to include the adapter's
// extensions to types in the "preact" and "enzyme" packages.

import 'enzyme-adapter-preact-pure';
import 'preact/debug';
import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

// Setup JSDOM
const dom = new JSDOM('', {
  // Enable `requestAnimationFrame` which Preact uses internally.
  pretendToBeVisual: true,
});

global.Event = dom.window.Event;
global.Node = dom.window.Node;
global.window = dom.window;
global.document = dom.window.document;
global.requestAnimationFrame = dom.window.requestAnimationFrame;

// Setup Enzyme
configure({ adapter: new Adapter() });