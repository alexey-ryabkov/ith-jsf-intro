import {
  type ActionReducerMapBuilder,
  type UnknownAction,
  isPending,
} from '@reduxjs/toolkit';

export function fetchLoadingReducer(
  builder: ActionReducerMapBuilder<{ loading: boolean }>,
) {
  builder.addMatcher(
    (action) => pickFetchAction(action),
    (state, action) => {
      state.loading = isPending(action);
    },
  );
}

export function pickFetchAction(action: UnknownAction) {
  return pickActionType(action, '', '', '/fetch');
}

export function pickActionType(
  action: UnknownAction,
  startParts?: string[] | string,
  endParts?: string[] | string,
  includeParts?: string[] | string,
) {
  const { type } = action;
  return (
    (!startParts || RegExp(`^${processActionParts(startParts)}`).test(type)) &&
    (!endParts || RegExp(`${processActionParts(endParts)}$`).test(type)) &&
    (!includeParts ||
      RegExp(`.+${processActionParts(includeParts)}.+`).test(type))
  );
}

function processActionParts(parts: string[] | string): string {
  if (!Array.isArray(parts)) {
    parts = [parts];
  }
  return parts.map((part) => escapeRegExp(part)).join('|');
}

const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);
function escapeRegExp(strRegExp: string) {
  strRegExp = String(strRegExp);
  return strRegExp && reHasRegExpChar.test(strRegExp)
    ? strRegExp.replace(reRegExpChar, '\\$&')
    : strRegExp;
}
