export interface UpdateStateVoteDb {
  otherInput: {
    dataOpened: {
      applicationId: number,
      channelId: string,
      pollId: number,
      pollStatus: string
    }
  },
  token: string;
}

export interface params {
  applicationId: number,
  channelId: string,
  pollId: number,
  taskToken: string,
  pollStatus: string
}