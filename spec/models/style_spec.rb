require "spec_helper"

describe Style do
  it{should be_valid}

  it{should_not allow_value( "x" * 256 ).for(:description)}
  it{should allow_value( "x" * 255 ).for(:description)}

  it{should_not allow_value( "x" * 256 ).for(:name)}
  it{should allow_value( "x" * 255 ).for(:name)}

  it{should allow_value("sample_template").for(:template_name)}
end
