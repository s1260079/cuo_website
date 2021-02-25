json.set! :bands do
  json.array! @bands do |band|
    json.extract! band, :id, :bandTitle, :bandContent
  end
end
