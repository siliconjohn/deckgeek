require "spec_helper"

describe Image do
  it{should be_valid}

  it{should_not allow_value( "x" * 256 ).for(:name)}
  it{should allow_value( "x" * 255 ).for(:name)}
end
