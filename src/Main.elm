module Main exposing (main, update)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Cool exposing (alert)

type Msg = Alert String

update : Msg -> () -> ( (), Cmd Msg )
update msg () =
    case msg of
        Alert message ->
            ((), alert message)

view : () -> Html Msg
view () =
    div [ class "jumbotron" ]
        [ h1 [] [ text "Welcome Ash Ketchum!" ]
        , p [ onClick (Alert "Cool" )]
            [ text <|
                """ 
                You and Pikachu finally made it! 🥇
                """
            , text (String.fromInt (1 + 2))
            ]
        ]


main : Program () () Msg
main =
    Browser.element
        { view = view
        , init = \() -> ((), Cmd.none)
        , update = update
        , subscriptions = (\model -> Sub.none)
        }
