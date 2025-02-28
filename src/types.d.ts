/// <reference types="@atproto/api" />
/// <reference types="vite/client" />

type AccountInfo = {
  shortDID: string;
  shortHandle: string;
  displayName?: string;
  description?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  obscurePublicRecords?: boolean;
};

type PostDetails = import('@atproto/api').AppBskyFeedPost.Record & {
  uri: string;
  cid: string;
};

type BlockedByRecord = {
  blocked_date: string;
  did: string;
  status: boolean;
};

type CompactHandleOrHandleDisplayName =
  | string
  | [shortHandle: string, displayName: string];

type SearchMatch = {
  rank: number;

  shortDID: string;
  shortDIDMatches?: string;

  shortHandle: string;
  shortHandleMatches?: string;

  displayName?: string;
  displayNameMatches?: string;

  postID?: string;
};

type ValueWithDisplayName = {
  displayName?: string;
  value: number | undefined;
};

interface TotalUsers {
  active_count: ValueWithDisplayName;
  deleted_count: ValueWithDisplayName;
  total_count: ValueWithDisplayName;
}

interface BlockStats {
  averageNumberOfBlocked: number;
  averageNumberOfBlocks: number;
  numberBlock1: number;
  numberBlocked1: number;
  numberBlocked101and1000: number;
  numberBlocked2and100: number;
  numberBlockedGreaterThan1000: number;
  numberBlocking101and1000: number;
  numberBlocking2and100: number;
  numberBlockingGreaterThan1000: number;
  numberOfTotalBlocks: number;
  numberOfUniqueUsersBlocked: number;
  numberOfUniqueUsersBlocking: number;
  percentNumberBlocked1: number;
  percentNumberBlocked101and1000: number;
  percentNumberBlocked2and100: number;
  percentNumberBlockedGreaterThan1000: number;
  percentNumberBlocking1: number;
  percentNumberBlocking101and1000: number;
  percentNumberBlocking2and100: number;
  percentNumberBlockingGreaterThan1000: number;
  percentUsersBlocked: number;
  percentUsersBlocking: number;
  totalUsers: number;
}

interface FunFacts {
  blocked: BlockList;
  blockers: BlockList;
}

interface FunnerFacts {
  blocked24: BlockList;
  blockers24: BlockList;
}

type DashboardStats = {
  asof: string | null;
  totalUsers: TotalUsers | null;
  blockStats: BlockStats | null;
  topLists: FunFacts & FunnerFacts;
};

type StatsEndpointResp<Data> =
  | {
      asof: string;
      data: Data;
    }
  | { timeLeft: string };

interface BlockData {
  count: number;
}

interface BlockList {
  [did: string]: BlockData;
}

interface DashboardBlockListEntry {
  count: number;
  did: string;
}

type DashboardBlockOverallEntry = {
  /** Average Number of Users Blocked */
  category: string;
  /** 9.80 */
  value: number;
};

type AccountListEntry = {
  created_date: string;
  date_added: string;
  description: string;
  did: string;
  name: string;
  status: boolean;
  url: string;
};
