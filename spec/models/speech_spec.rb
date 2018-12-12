require 'rails_helper'

RSpec.describe Speech, type: :model do
  it { should have_valid(:speech).when("This is an example speech")}
  it { should_not have_valid(:speech).when(nil, "")}
end
