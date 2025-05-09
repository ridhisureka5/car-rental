# SPDX-License-Identifier: MIT
owner: public(address)
renter_logs: public(HashMap[uint256, address])
renter_counter: public(uint256)

@deploy
def __init__():
    self.owner = msg.sender
    self.renter_counter = 0

@payable
@external
def payForRental():
    assert msg.value > 0, "Payment must be greater than 0"
    self.renter_logs[self.renter_counter] = msg.sender
    self.renter_counter += 1

@external
def withdraw():
    assert msg.sender == self.owner, "Only owner can withdraw"
    send(self.owner, self.balance)

