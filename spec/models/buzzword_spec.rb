require 'rails_helper'

RSpec.describe Buzzword, type: :model do
  it { should have_valid(:word).when("word")}
  it { should_not have_valid(:word).when(nil, "")}
end
