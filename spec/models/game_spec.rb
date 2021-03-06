require "spec_helper"

describe Game do
  it{should be_valid}

  it{should_not allow_value( "x" * 256 ).for(:description)}
  it{should allow_value( "x" * 255 ).for(:description)}

  it{should_not allow_value( "x" * 256 ).for(:name)}
  it{should allow_value( "x" * 255 ).for(:name)}

  it{should have_many(:decks).dependent(:destroy)}
  it{should belong_to(:user)}
  it{should have_many(:cards)}
end
