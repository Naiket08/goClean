export interface userDetails {
    userdetails: {
        firstname: string,
        lastname : string,
        emailId : string,
        PhoneNumber: number,
        isNewUser: boolean
      },
      devices : {
        laundryBasketStatus: number,
        DustbinStatus: boolean,
        ventStatus: string
      }
}