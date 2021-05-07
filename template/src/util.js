// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

export function isFocusVisibleSupported() {
  try {
    document.querySelector(':focus-visible');
  } catch {
    return false;
  }
  return true;
}

// https://github.com/WICG/focus-visible#shadow-dom
export function isFocusVisiblePolyfillAvailable() {
  return window.applyFocusVisiblePolyfill != null;
}
