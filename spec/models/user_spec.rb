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

RSpec.describe User, type: :model do
  it { should have_valid(:first_name).when("Alan") }
  it { should_not have_valid(:first_name).when(nil, "") }
  it { should have_valid(:last_name).when("Dust") }
  it { should_not have_valid(:last_name).when(nil, "") }
  it { should have_valid(:email).when("alan.dust@gmail.com") }
  it { should_not have_valid(:last_name).when(nil, "") }
  it { should have_valid(:encrypted_password).when("Password") }
  it { should_not have_valid(:encrypted_password).when(nil, "") }
  it { should have_valid(:role).when("admin") }
  it { should_not have_valid(:role).when(nil, "") }
end
