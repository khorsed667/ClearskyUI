// @ts-check
/// <reference path="../../types.d.ts" />

import React from 'react';

import { isPromise, resolveHandleOrDID } from '../../api';
import { FormatTimestamp } from '../../common-components/format-timestamp';
import { Visible } from '../../common-components/visible';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
import { withStyles } from '@mui/styles';
import { AccountShortEntry } from '../../common-components/account-short-entry';

const INITIAL_SIZE = 20;
const GROW_BLOCK_SIZE = 29;

/**
 * @param {{
 *  account: AccountInfo | { shortHandle: string, loading: true };
 *  blocklist: BlockedByRecord[];
 * }} _ 
 */
export function ListView({ account, blocklist }) {
  const [listSize, setListSize] = useState(INITIAL_SIZE);
  const showSize = Math.min(blocklist.length, listSize);
  return (
    <ul className='block-list'>
      {
        blocklist.slice(0, showSize).map((block, index) => {
          const entry =
            <ListViewEntry
              key={index}
              account={account}
              {...block} />;

          return (
            index < showSize - 1 ?
              entry :
              <Visible
                key={index}
                rootMargin='0px 0px 300px 0px'
                onVisible={handleBottomVisible}
              >
                {entry}
              </Visible>
          );
        })
      }
    </ul>
  );

  function handleBottomVisible() {
    const incrementListSize = listSize + GROW_BLOCK_SIZE;
    setListSize(incrementListSize);
    if (incrementListSize > blocklist.length) {
      // TODO: fetch more
    }
  }
}

/**
 * @param {{
 *  account: AccountInfo | {shortHandle: string, loading: true};
 *  blocked_date: string;
 *  handle: string;
 *  className?: string;
 * }} _
 */
function ListViewEntry({ account, blocked_date, handle, className, ...rest }) {

  const result = (
    <li {...rest} className={'blocking-list-entry ' + (className || '')}>
      <AccountShortEntry
        className='blocking-account-link'
        accountTooltipBanner={
          !blocked_date ? undefined :
            <div className='account-info-panel-blocked-timestamp'>
              blocked
              <div className='account-info-panel-blocked-timestamp-full'>
                {new Date(blocked_date).toString()}
              </div>
            </div>
        }
        account={handle}>
        <FormatTimestamp
          timestamp={blocked_date}
          noTooltip
          className='blocking-date' />
        </AccountShortEntry>
    </li>
  );

  return result;
}
