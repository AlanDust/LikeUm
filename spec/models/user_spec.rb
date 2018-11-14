require 'rails_helper'

describe "#admin?" do
  it "is not an admin if the role is not admin" do
    user = FactoryBot.create(:user, role: "false", first_name: "Alan", last_name: "Dust")
    expect(user.admin?).to eq(false)
  end

  it "is an admin if the role is admin" do
    user = FactoryBot.create(:user, role: "true", first_name: "Alan", last_name: "Dust")
    expect(user.admin?).to eq(true)
  end
end
