json.set! :bands do
  json.array! @bands do |band|
    json.extract! band, :id, :bandTitle, :bandContent, :password, :message
  end
end
