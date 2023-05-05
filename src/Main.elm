module Main exposing (main, update)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)

import Fetch

getPublicOpinion : Cmd Msg
getPublicOpinion =
  Fetch.get
    { url = "https://elm-lang.org/assets/public-opinion.txt"
    , expect = Fetch.expectString GotText
    }

type alias State = (Int, String)

type Msg
    = Alert String
    | GotText (Result Fetch.Error String)

update : Msg -> State -> ( State, Cmd Msg )
update msg (i, txt) =
    case msg of
        Alert message ->
            ((i + 1, txt), getPublicOpinion)

        GotText (Err err) ->
            ((i, txt), Cmd.none)

        GotText (Ok txt_) ->
            ((i, txt_), Cmd.none)

view : State -> Html Msg
view (i, txt) =
    div [ class "jumbotron" ]
        [ h1 [] [ text ( "Welcome Ash Ketchum!" ++ txt ) ]
        , p [ onClick (Alert "Cool" )]
            [ text <|
                """ 
                You and Pikachu finally made it! 🥇
                """
            , text (String.fromInt (1 + i))
            ]
        ]


main : Program () State Msg
main =
    Browser.element
        { view = view
        , init = \() -> ((0, ""), Cmd.none)
        , update = update
        , subscriptions = (\model -> Sub.none)
        }
