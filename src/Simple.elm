module Simple exposing (..)

import Cool exposing (alert)

simp : Cmd ()
simp =
    Cool.alert "hi mom"
