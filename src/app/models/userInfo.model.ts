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
        ventStatus: boolean,
        washingMachineStatus: boolean
      },
      room:{
        room1: boolean,
        room2: boolean,
        room3: boolean,
        room4: boolean
      }
}