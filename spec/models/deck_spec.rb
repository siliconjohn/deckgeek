require "spec_helper"

describe Deck do
  it{should be_valid}

  it{should_not allow_value( "x" * 256 ).for(:description)}
  it{should allow_value( "x" * 255 ).for(:description)}

  it{should_not allow_value( "x" * 256 ).for(:name)}
  it{should allow_value( "x" * 255 ).for(:name)}

  it{should have_many(:cards).dependent(:destroy)}
  it{should belong_to(:game)}
end
